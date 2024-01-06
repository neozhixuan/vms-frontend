const backendURL = "http://localhost:8080";

export const fetchBossEvent = async (boss_id: number) => {
  try {
    const response = await fetch(
      `${backendURL}/getbossevent?boss_id=${boss_id}`,
    );
    console.log("hi");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const handlePostSubmit = async (requestBody: string) => {
  try {
    const response = await fetch(`${backendURL}/addevent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: requestBody,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

export const fetchEvent = async (id: number) => {
  try {
    const response = await fetch(`${backendURL}/getevent?id=${id}`);
    console.log("hi");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchEvents = async () => {
  try {
    const response = await fetch(`${backendURL}/getevents`);
    console.log("hi");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const handleLogin = async (inVal: any) => {
  try {
    const response = await fetch(`${backendURL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inVal),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

export const handleSignUp = async (requestBody: {
  is_allocated: boolean;
  participant_id: number;
  event_id: number;
  shift_id: number;
}) => {
  try {
    const response = await fetch(`${backendURL}/addavailability`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

export const checkParticipant = async (inVal: any) => {
  const isParticipant = await fetch(`${backendURL}/is_participant`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(inVal),
  });
  return isParticipant;
};

export const addParticipant = async (participantRequest: any) => {
  const participantResponse = await fetch(`${backendURL}/addparticipant`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(participantRequest),
  });
  return participantResponse;
};
