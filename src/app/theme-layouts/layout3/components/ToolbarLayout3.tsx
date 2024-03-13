import { ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Hidden from '@mui/material/Hidden';
import Toolbar from '@mui/material/Toolbar';
import clsx from 'clsx';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { selectFuseCurrentLayoutConfig, selectToolbarTheme } from 'app/store/fuse/settingsSlice';
import AdjustFontSize from '../../shared-components/AdjustFontSize';
import FullScreenToggle from '../../shared-components/FullScreenToggle';
import LanguageSwitcher from '../../shared-components/LanguageSwitcher';
import NotificationPanelToggleButton from '../../shared-components/notificationPanel/NotificationPanelToggleButton';
import NavigationSearch from '../../shared-components/NavigationSearch';
import UserMenu from '../../shared-components/UserMenu';
import QuickPanelToggleButton from '../../shared-components/quickPanel/QuickPanelToggleButton';
import Logo from '../../shared-components/Logo';
import NavbarToggleButton from '../../shared-components/NavbarToggleButton';
import { Layout3ConfigDefaultsType } from '../Layout3Config';

type ToolbarLayout3Props = {
	className?: string;
};

/**
 * The toolbar layout 3.
 */
function ToolbarLayout3(props: ToolbarLayout3Props) {
	const { className = '' } = props;
	const config = useSelector(selectFuseCurrentLayoutConfig) as Layout3ConfigDefaultsType;
	const toolbarTheme = useSelector(selectToolbarTheme);

	return (
		<ThemeProvider theme={toolbarTheme}>
			<AppBar
				id="fuse-toolbar"
				className={clsx('relative z-20 flex shadow-md', className)}
				color="default"
				style={{ backgroundColor: toolbarTheme.palette.background.paper }}
			>
				<Toolbar className="container min-h-48 p-0 md:min-h-64 lg:px-24">
					{config.navbar.display && (
						<Hidden lgUp>
							<NavbarToggleButton className="mx-0 h-40 w-40 p-0 sm:mx-8" />
						</Hidden>
					)}

					<Hidden lgDown>
						<div className={clsx('flex shrink-0 items-center')}>
							{/* <Logo /> */}
						</div>
					</Hidden>

					<div className="flex flex-1">
						<Hidden smDown>
							<NavigationSearch
								className="mx-16 lg:mx-24"
								variant="basic"
							/>
						</Hidden>
					</div>

					<div className="flex h-full items-center overflow-x-auto px-8 md:px-0">
						<Hidden smUp>
							<NavigationSearch />
						</Hidden>
						<LanguageSwitcher />
						<AdjustFontSize />
						<FullScreenToggle />
						<QuickPanelToggleButton />
						<NotificationPanelToggleButton />
						<UserMenu />
					</div>
				</Toolbar>
			</AppBar>
		</ThemeProvider>
	);
}

export default memo(ToolbarLayout3);
