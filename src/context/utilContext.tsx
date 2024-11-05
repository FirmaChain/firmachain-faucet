import { createContext, useContext, ReactNode, useState } from 'react';

interface UtilContextProps {
	alertMessage: string;
	setAlertMessage: (v: string) => void;
	alertTimer: number;
	setAlertTimer: (v: number) => void;
	alertType: string;
	setAlertType: (v: string) => void;
	alertOpen: boolean;
	setAlertOpen: (v: boolean) => void;
	isLoading: boolean;
	setIsLoading: (v: boolean) => void;
	handleAlertOpen: (label: string, timer: number, type: string) => void;
	handleLoadingOpen: (loading: boolean) => void;
}

const UtilContext = createContext<UtilContextProps | undefined>(undefined);

export const useUtilContext = () => {
	const context = useContext(UtilContext);
	if (!context) {
		throw new Error('useUtilContext must be used within a UtilProvider');
	}
	return context;
};

export const UtilProvider = ({ children }: { children: ReactNode }) => {
	const [alertMessage, setAlertMessage] = useState<string>('');
	const [alertTimer, setAlertTimer] = useState<number>(1000);
	const [alertType, setAlertType] = useState<string>('success');
	const [alertOpen, setAlertOpen] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleAlertOpen = (label: string, timer: number, type: string) => {
		setAlertMessage(label);
		setAlertTimer(timer);
		setAlertType(type);
		setAlertOpen(true);
	};

	const handleLoadingOpen = (loading: boolean) => {
		setIsLoading(loading);
	};

	return (
		<UtilContext.Provider
			value={{
				alertMessage,
				setAlertMessage,
				alertTimer,
				setAlertTimer,
				alertType,
				setAlertType,
				alertOpen,
				setAlertOpen,
				isLoading,
				setIsLoading,
				handleAlertOpen,
				handleLoadingOpen,
			}}
		>
			{children}
		</UtilContext.Provider>
	);
};
