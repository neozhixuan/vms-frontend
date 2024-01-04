export const fetchBossEvent = async (boss_id: number) => {
  try {
    const response = await fetch(
      `http://localhost:8080/getbossevent?boss_id=${boss_id}`,
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
