const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function getStates(): Promise<any[]> {
  const res = await fetch(
    `${API_URL}/geo?resource=states&parentId=MX`
  ).then((res) => res.json());
  console.log("getStates res:", res);
  return res;
}

async function getCities(stateId: string): Promise<any[]> {
  const res = await fetch(
    `${API_URL}/geo?resource=cities&parentId=${stateId}`
  ).then((res) => res.json());
  console.log("getCities res:", res);
  return res;
}

export { getStates, getCities };
