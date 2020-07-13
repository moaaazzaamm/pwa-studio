import { useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useUserContext } from '@magento/peregrine/lib/context/user';
import { useDropdown } from '@magento/peregrine/lib/hooks/useDropdown';

/**
 *
 */
export const useAccountTrigger = () => {
    const {
        elementRef: accountMenuRef,
        expanded: accountMenuIsOpen,
        setExpanded: setAccountMenuIsOpen,
        triggerRef: accountMenuTriggerRef
    } = useDropdown();

    const [{ isSignedIn: isUserSignedIn }] = useUserContext();
    const location = useLocation();

    const handleTriggerClick = useCallback(() => {
        // Toggle the Account Menu.
        setAccountMenuIsOpen(isOpen => !isOpen);
    }, [setAccountMenuIsOpen]);

    // Close the Account Menu on page change.
    useEffect(() => {
        setAccountMenuIsOpen(false);
    }, [location.pathname, setAccountMenuIsOpen]);

    return {
        accountMenuIsOpen,
        accountMenuRef,
        accountMenuTriggerRef,
        handleTriggerClick,
        isUserSignedIn
    };
};
