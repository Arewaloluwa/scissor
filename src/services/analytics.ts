export interface AnalyticsData {
  clicks: number;

  countries: string[];

  devices: string[];

  referrers: string[];
}

export const getAnalytics = (
  data: AnalyticsData
) => {
  return {
    totalClicks: data.clicks,

    countries: data.countries,

    devices: data.devices,

    referrers: data.referrers,
  };
};