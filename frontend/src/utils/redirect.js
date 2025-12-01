export const saveRedirectPath = () => {
    localStorage.setItem(
        "afterLogin",
        window.location.pathname + window.location.search
    );
};

export const popRedirectPath = () => {
    const path = localStorage.getItem("afterLogin");
    if (path) localStorage.removeItem("afterLogin");
    return path || "/feed";
};
