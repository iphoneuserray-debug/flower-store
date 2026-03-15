import { useRef, useState, useCallback, useEffect } from "react";

import {
    type PanzoomOptions,
    type PanzoomInstance,
    Panzoom,
} from "@fancyapps/ui/dist/panzoom/";
import "@fancyapps/ui/dist/panzoom/panzoom.css";

import { canUseDOM } from "@fancyapps/ui/dist/utils/canUseDOM.js";
import { isEqual } from "@fancyapps/ui/dist/utils/isEqual.js";

export type PanzoomContainerRefType = <ContainerElement extends HTMLElement>(
    el: ContainerElement | null
) => void;

export type usePanzoom = [PanzoomContainerRefType, PanzoomInstance | undefined];

export default function usePanzoom(
    options: Partial<PanzoomOptions> = {}
): usePanzoom {
    const storedOptions = useRef(options);

    const [container, setContainer] = useState<HTMLElement | null>(null);
    const [panzoomInstance, setPanzoomInstance] = useState<
        PanzoomInstance | undefined
    >(undefined);

    const reInit = useCallback(() => {
        if (panzoomInstance) {
            panzoomInstance.destroy().init();
        }
    }, [panzoomInstance]);

    useEffect(() => {
        if (!isEqual(options, storedOptions.current)) {
            storedOptions.current = options;
            reInit();
        }
    }, [options, reInit]);

    useEffect(() => {
        if (canUseDOM() && container) {
            const newPanzoomInstance = Panzoom(
                container,
                storedOptions.current
            ).init();

            setPanzoomInstance(newPanzoomInstance);

            return () => {
                newPanzoomInstance.destroy();
            };
        } else {
            setPanzoomInstance(undefined);
        }
    }, [container]);

    return [setContainer, panzoomInstance];
}