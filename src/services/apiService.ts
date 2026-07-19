import { getCompanyData } from "@/data/home";
import { axiosInterceptor } from "@/network/apiClient";
import { useQuery } from "@tanstack/react-query";
import { Platform } from "react-native";

export const DEFAULT_STALE_TIME = 1000 * 60 * 5;
export const DEFAULT_GC_TIME = 1000 * 60 * 5;

export const useGetCompanyList = (payload: any) => {
  const url = "companies";

  return useQuery({
    queryKey: ["GetCompanyList", payload],
    queryFn: async () => {
      const res = await axiosInterceptor.post(url, payload);
      return Platform.OS === "ios" ? getCompanyData : res?.data;
    },
    staleTime: DEFAULT_STALE_TIME,
    gcTime: DEFAULT_GC_TIME,
  });
};
