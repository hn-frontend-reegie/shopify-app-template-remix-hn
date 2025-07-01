export const restrictedItem = {
  action: {
    fetchDashboard: "FETCH_DASHBOARD",
  },
  page: {
    dashboard: "DASHBOARD_PAGE",
  },
};

export const privilegeConfig = {
  restrictions: [
    {
      name: restrictedItem.page.dashboard,
      type: "page",
      required: [
        {
          privilege: "algolia.dashboard",
          access: ["read"],
        },
      ],
    },
    {
      name: restrictedItem.action.fetchDashboard,
      type: "action",
      required: [
        {
          privilege: "algolia.dashboard",
          access: ["write"],
        },
      ],
    },
  ],
};
