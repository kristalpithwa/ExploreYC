import { axiosInterceptor } from "@/network/apiClient";
import { useInfiniteQuery, useQuery, useMutation } from "@tanstack/react-query";

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
  const isId = payload && !isNaN(payload) && !isNaN(parseFloat(payload));
  const url = isId ? `companies/${payload}` : `company/slug/${payload}`;

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

export const useGetCompanyDetailsBySlug = (payload: any) => {
  const url = `company/slug/${payload}`;

  return useQuery({
    queryKey: ["GetCompanyDetailsBySlug", payload],
    queryFn: async () => {
      const res = await axiosInterceptor.get(url);
      return res?.data;
    },
    staleTime: DEFAULT_STALE_TIME,
    gcTime: DEFAULT_GC_TIME,
  });
};

export const useGetFilterBatches = () => {
  const url = "filters/batches";

  return useQuery({
    queryKey: ["GetFilterBatches"],
    queryFn: async () => {
      const res = await axiosInterceptor.get(url);
      return res?.data?.batches || [];
    },
    staleTime: DEFAULT_STALE_TIME,
    gcTime: DEFAULT_GC_TIME,
  });
};

export const useGetFilterIndustries = () => {
  const url = "filters/industries";

  return useQuery({
    queryKey: ["GetFilterIndustries"],
    queryFn: async () => {
      const res = await axiosInterceptor.get(url);
      return res?.data?.industries || [];
    },
    staleTime: DEFAULT_STALE_TIME,
    gcTime: DEFAULT_GC_TIME,
  });
};

export const useGetFilterCountries = () => {
  const url = "filters/countries";

  return useQuery({
    queryKey: ["GetFilterCountries"],
    queryFn: async () => {
      const res = await axiosInterceptor.get(url);
      return res?.data?.countries || [];
    },
    staleTime: DEFAULT_STALE_TIME,
    gcTime: DEFAULT_GC_TIME,
  });
};

export const useGetFilterSources = () => {
  const url = "filters/sources";

  return useQuery({
    queryKey: ["GetFilterSources"],
    queryFn: async () => {
      const res = await axiosInterceptor.get(url);
      return res?.data?.sources || [];
    },
    staleTime: DEFAULT_STALE_TIME,
    gcTime: DEFAULT_GC_TIME,
  });
};

export const useGetStats = () => {
  const url = "stats";

  return useQuery({
    queryKey: ["useGetStats"],
    queryFn: async () => {
      const res = await axiosInterceptor.get(url);
      return res?.data || [];
    },
    staleTime: DEFAULT_STALE_TIME,
    gcTime: DEFAULT_GC_TIME,
  });
};

export const useGetBatchCompanies = (payload: string) => {
  const url = "companies";

  const query = {
    batch: payload,
    limit: 10,
    offset: 0,
  };

  return useQuery({
    queryKey: ["useGetBatchCompanies", query],
    queryFn: async () => {
      const res = await axiosInterceptor.get(url, {
        params: query,
      });
      return res?.data || [];
    },
    staleTime: DEFAULT_STALE_TIME,
    gcTime: DEFAULT_GC_TIME,
  });
};

export const useGetMapStartups = (params: any) => {
  const url = "map";

  return useQuery({
    queryKey: ["useGetMapStartups", params],
    queryFn: async () => {
      const res = await axiosInterceptor.get(url, { params });
      return res?.data || { companies: [], total: 0 };
    },
    staleTime: DEFAULT_STALE_TIME,
    gcTime: DEFAULT_GC_TIME,
  });
};

export const useGetFoundersLeaderboard = (params: any) => {
  const url = "founders/leaderboard";

  return useQuery({
    queryKey: ["useGetFoundersLeaderboard", params],
    queryFn: async () => {
      const res = await axiosInterceptor.get(url, { params });
      return res?.data || { results: [], total: 0 };
    },
    staleTime: DEFAULT_STALE_TIME,
    gcTime: DEFAULT_GC_TIME,
  });
};

export const useGetFoundersLeaderboardInfinite = (payload: any) => {
  const url = "founders/leaderboard";

  return useInfiniteQuery({
    queryKey: ["useGetFoundersLeaderboardInfinite", payload],
    queryFn: async ({ pageParam = 0 }) => {
      const currentPayload = {
        ...payload,
        offset: pageParam,
      };

      const res = await axiosInterceptor.get(url, { params: currentPayload });
      return res?.data || { results: [], total: 0, metric: payload.metric };
    },
    getNextPageParam: (lastPage: any, allPages: any[]) => {
      const currentOffset = allPages.length * payload.limit;
      if (lastPage?.results?.length === payload.limit) {
        return currentOffset;
      }
      return undefined;
    },
    initialPageParam: 0,
    staleTime: DEFAULT_STALE_TIME,
    gcTime: DEFAULT_GC_TIME,
  });
};

export const useGetFounderProfile = (slug: string) => {
  const url = `founders/${slug}`;

  return useQuery({
    queryKey: ["useGetFounderProfile", slug],
    queryFn: async () => {
      if (!slug) return null;
      const res = await axiosInterceptor.get(url);
      return res?.data;
    },
    enabled: !!slug,
    staleTime: DEFAULT_STALE_TIME,
    gcTime: DEFAULT_GC_TIME,
  });
};

export const useGetHiringAnalytics = () => {
  const url = "hiring/analytics";

  return useQuery({
    queryKey: ["useGetHiringAnalytics"],
    queryFn: async () => {
      const res = await axiosInterceptor.get(url);
      return res?.data;
    },
    staleTime: DEFAULT_STALE_TIME,
    gcTime: DEFAULT_GC_TIME,
  });
};

export const useGetHiringJobsInfinite = (payload: any) => {
  const url = "hiring/jobs/paginated";

  return useInfiniteQuery({
    queryKey: ["useGetHiringJobsInfinite", payload],
    queryFn: async ({ pageParam = 1 }) => {
      const currentPayload = {
        ...payload,
        page: pageParam,
      };

      const res = await axiosInterceptor.get(url, { params: currentPayload });
      return (
        res?.data || {
          jobs: [],
          total: 0,
          page: 1,
          total_pages: 1,
          has_next: false,
        }
      );
    },
    getNextPageParam: (lastPage: any) => {
      if (lastPage?.has_next) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    staleTime: DEFAULT_STALE_TIME,
    gcTime: DEFAULT_GC_TIME,
  });
};

export const useGetHiringBoardStats = () => {
  const url = "hiring/stats";

  return useQuery({
    queryKey: ["useGetHiringBoardStats"],
    queryFn: async () => {
      const res = await axiosInterceptor.get(url);
      return res?.data || {};
    },
    staleTime: DEFAULT_STALE_TIME,
    gcTime: DEFAULT_GC_TIME,
  });
};

export const useValidateIdeaMutation = () => {
  const url = "validate-idea";

  return useMutation({
    mutationFn: async (payload: { idea: string; max_similar?: number }) => {
      const res = await axiosInterceptor.post(url, payload);
      return res?.data;
    },
  });
};

export const usePredictSuccessMutation = () => {
  const url = "gamified-predict";

  return useMutation({
    mutationFn: async (payload: any) => {
      const res = await axiosInterceptor.post(url, payload);
      return res?.data;
    },
  });
};

// Roadmap Hooks
export const useGetRoadmapVotes = () => {
  return useQuery({
    queryKey: ["roadmap-votes"],
    queryFn: async () => {
      const res = await axiosInterceptor.get("roadmap/votes");
      return res?.data?.votes as Record<string, number>;
    },
  });
};

export const useGetUserVotes = (userIdentifier: string) => {
  return useQuery({
    queryKey: ["roadmap-user-votes", userIdentifier],
    queryFn: async () => {
      const res = await axiosInterceptor.get(`roadmap/user-votes/${userIdentifier}`);
      return new Set(res?.data?.feature_ids as string[]);
    },
    enabled: !!userIdentifier,
  });
};

export const useVoteRoadmapFeature = () => {
  return useMutation({
    mutationFn: async ({ featureId, userIdentifier }: { featureId: string; userIdentifier: string }) => {
      const res = await axiosInterceptor.post(`roadmap/vote/${featureId}`, { user_identifier: userIdentifier });
      return res?.data;
    },
  });
};

export const useUnvoteRoadmapFeature = () => {
  return useMutation({
    mutationFn: async ({ featureId, userIdentifier }: { featureId: string; userIdentifier: string }) => {
      const res = await axiosInterceptor.delete(`roadmap/vote/${featureId}`, {
        data: { user_identifier: userIdentifier },
      });
      return res?.data;
    },
  });
};
