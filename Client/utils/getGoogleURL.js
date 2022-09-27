export const getGoogleOAuthURL = () => {
    const rootURL = 'https://accounts.google.com/o/oauth2/v2/auth';
    const options = {
        redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_REDIRECT_URL,
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        access_type: "offline",
        response_type: "code",
        prompt: "consent",
        scope: [
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/userinfo.profile",
        ].join(" "),
    };
    
    const qs = new URLSearchParams(options);
    console.log("QS: ", qs);
    return `${rootURL}?${qs.toString()}`;
}