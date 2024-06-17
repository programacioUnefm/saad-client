import { saadApi } from "@/api/SaddApp";

export const search = async (route, search = "", page = 0) => {
  try {
    const resp = await saadApi.get(`route`);
    
  } catch (error) {
    console.log(error)
  }
};
