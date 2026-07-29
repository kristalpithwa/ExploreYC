import { axiosInterceptor } from "@/network/apiClient";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export const DEFAULT_STALE_TIME = 1000 * 60 * 5;
export const DEFAULT_GC_TIME = 1000 * 60 * 5;

export const useGetCompanyList = (payload: any) => {
  const url = "companies";

  return useQuery({
    queryKey: ["GetCompanyList", payload],
    queryFn: async () => {
      const res = await axiosInterceptor.post(url, payload);
      return res?.data;
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
      return res?.data;
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
      return res?.data;
    },
    staleTime: DEFAULT_STALE_TIME,
    gcTime: DEFAULT_GC_TIME,
  });
};

export const useGetFilterBatches = () => {
  return useQuery({
    queryKey: ["GetFilterBatches"],
    queryFn: async () => {
      const res = await axiosInterceptor.get("filters/batches");
      return res?.data?.batches || [];
    },
    staleTime: DEFAULT_STALE_TIME,
    gcTime: DEFAULT_GC_TIME,
  });
};

export const useGetFilterIndustries = () => {
  return useQuery({
    queryKey: ["GetFilterIndustries"],
    queryFn: async () => {
      const res = await axiosInterceptor.get("filters/industries");
      return res?.data?.industries || [];
    },
    staleTime: DEFAULT_STALE_TIME,
    gcTime: DEFAULT_GC_TIME,
  });
};

export const useGetFilterCountries = () => {
  return useQuery({
    queryKey: ["GetFilterCountries"],
    queryFn: async () => {
      const res = await axiosInterceptor.get("filters/countries");
      return res?.data?.countries || [];
    },
    staleTime: DEFAULT_STALE_TIME,
    gcTime: DEFAULT_GC_TIME,
  });
};

export const useGetFilterSources = () => {
  return useQuery({
    queryKey: ["GetFilterSources"],
    queryFn: async () => {
      const res = await axiosInterceptor.get("filters/sources");
      return res?.data?.sources || [];
    },
    staleTime: DEFAULT_STALE_TIME,
    gcTime: DEFAULT_GC_TIME,
  });
};

export const useGetStats = () => {
  return useQuery({
    queryKey: ["useGetStats"],
    queryFn: async () => {
      const res = await axiosInterceptor.get("stats");
      return res?.data || [];
    },
    staleTime: DEFAULT_STALE_TIME,
    gcTime: DEFAULT_GC_TIME,
  });
};

export const useGetBatchCompanies = (payload: string) => {
  const query = {
    batch: payload,
    limit: 10,
    offset: 0,
  };

  return useQuery({
    queryKey: ["useGetBatchCompanies", query],
    queryFn: async () => {
      const res = await axiosInterceptor.get("companies", {
        params: query,
      });
      return res?.data || [];
    },
    staleTime: DEFAULT_STALE_TIME,
    gcTime: DEFAULT_GC_TIME,
  });
};
