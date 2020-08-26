interface ErrorWithResponse extends Error {
  response: Response;
  data: any;
}

const fetcher: (url: string, option?: any) => Promise<any> = async (
  url: string,
  option?: any,
) => {
  try {
    let response = await fetch(url, option);

    if (response.status === 419) {
      const { accessToken } = await fetcher('/api/refresh');

      response = await fetch(url, {
        ...option,
        headers: {
          ...option.headers,
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }

    const data = await response.json();

    if (response.ok) {
      return data;
    }

    const error = new Error(response.statusText) as ErrorWithResponse;
    error.response = response;
    error.data = data;

    throw error;
  } catch (error) {
    if (!error.data) {
      error.data = { message: error.message };
    }
    throw error;
  }
};

export default fetcher;
