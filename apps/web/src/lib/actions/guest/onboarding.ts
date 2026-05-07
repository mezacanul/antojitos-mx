export async function testEmail(payload: any) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/guests/public/signup?action=testEmail`,
    {
      method: "POST",
      body: JSON.stringify(payload),
    }
  );
  return response.json();
}

export async function createGuest(payload: any) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/guests/public/signup?action=createGuest`,
      {
        method: "POST",
        body: JSON.stringify(payload),
      }
    );
    return response.json();
  } catch (error) {
    console.error("Error creating guest:", error);
    throw error;
  }
}
