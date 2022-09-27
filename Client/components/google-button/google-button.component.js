import React from "react"
import styles from "../../styles/component-styles/google-button.module.css"
import {getGoogleOAuthURL} from "../../utils/getGoogleURL";

const GoogleButton = () => {
    return (
        <a href={getGoogleOAuthURL()} className={styles.loginGoogleBtn}>
          Sign in with Google
        </a>
    )
}

export default GoogleButton;