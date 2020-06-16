/*
Copyright 2020 The Matrix.org Foundation C.I.C.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import React from "react";

import SettingsSection from "../SettingsSection";
import StyledCheckbox from "../../elements/StyledCheckbox";
import {_t} from "../../../../languageHandler";
import AccessibleButton from "../../elements/AccessibleButton";
import {useSettingValue} from "../../../../hooks/useSettings";
import SettingsStore, {SettingLevel} from "../../../../settings/SettingsStore";

const NOTIFICATIONS_ENABLED_KEY = "notificationsEnabled";
const NOTIFICATIONS_BODY_ENABLED_KEY = "notificationBodyEnabled";

const onNotificationsBodyCheckboxChange = (ev) => {
    SettingsStore.setValue(NOTIFICATIONS_BODY_ENABLED_KEY, null, SettingLevel.DEVICE, ev.target.checked);
};

const DesktopNotifications = () => {
    const desktopNotificationsEnabled = useSettingValue(NOTIFICATIONS_ENABLED_KEY);
    const notificationsBodyEnabled = useSettingValue(NOTIFICATIONS_BODY_ENABLED_KEY);

    const onToggleNotificationsClick = () => {
        // error from this gets shown to the user in a modal
        SettingsStore.setValue(NOTIFICATIONS_ENABLED_KEY, null, SettingLevel.DEVICE, !desktopNotificationsEnabled);
    };

    let copy;
    let buttonText;
    if (desktopNotificationsEnabled) {
        copy = _t("System provided notifications are currently enabled.");
        // todo make this text Red
        buttonText = _t("Disable");
    } else {
        copy = _t("System provided notifications are currently disabled.");
        buttonText = _t("Enable");
    }

    return <SettingsSection title={_t("Desktop notifications")}>
        <div>
            {copy} <AccessibleButton kind="link" onClick={onToggleNotificationsClick}>{buttonText}</AccessibleButton>
        </div>
        <StyledCheckbox
            checked={notificationsBodyEnabled}
            onChange={onNotificationsBodyCheckboxChange}
            disabled={!desktopNotificationsEnabled}
        >
            {_t("Receive OS provided notifications from your desktop application")}
        </StyledCheckbox>
    </SettingsSection>;
};

export default DesktopNotifications;