import { getCompanyData } from "@/data/home";
import { axiosInterceptor } from "@/network/apiClient";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
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

export const useGetCompanyListInfinite = (payload: any) => {
  const url = "companies";

  return useInfiniteQuery({
    queryKey: ["GetCompanyListInfinite", payload],
    queryFn: async ({ pageParam = 0 }: any) => {
      const requestPayload = { ...payload, offset: pageParam };
      const res = await axiosInterceptor.post(url, requestPayload);
      return Platform.OS === "ios" ? getCompanyData : res?.data;
    },
    getNextPageParam: (lastPage: any) => {
      if (!lastPage) return undefined;
      return lastPage.has_more ? lastPage.offset + lastPage.limit : undefined;
    },
    initialPageParam: 0,
    staleTime: DEFAULT_STALE_TIME,
    gcTime: DEFAULT_GC_TIME,
  });
};

export const useGetCompanyDetails = (payload: any) => {
  const url = "companies/" + payload;

  return useQuery({
    queryKey: ["GetCompanyDetails", payload],
    queryFn: async () => {
      const res = await axiosInterceptor.get(url);
      return Platform.OS === "ios" ? getCompanyData : res?.data;
    },
    staleTime: DEFAULT_STALE_TIME,
    gcTime: DEFAULT_GC_TIME,
  });
};
