import ViewSidebarRoundedIcon from '@mui/icons-material/ViewSidebarRounded';
import {
    Navbar,
    NavbarContent
} from "@nextui-org/navbar";
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { useSidebar } from '../_services/Context';
import IconButton from './IconButton';
import { ThemeSwitcher } from "./ThemeSwitcher";

interface PSNavbarProps {
    className?: string;
    sideBarIcon?: boolean;
    onToggleSidebar?: () => void;
}

const PSNavbar: React.FC<PSNavbarProps> = ({ sideBarIcon }) => {
    const router = useRouter();
    const { showSideBar, setShowSideBar, setId, setSelected } = useSidebar();

    return (
        <Navbar
            position='sticky'
            className="bg-background" maxWidth="full">
            <NavbarContent
                className="px-2 ml-0">
                <div className='flex space-x-8'>
                    {
                        sideBarIcon && (
                            <IconButton
                                className='absolute top-2 left-2'
                                onClick={() => {
                                    setShowSideBar(!showSideBar)
                                }}
                                ariaLabel="Open Sidebar"
                            >
                                <ViewSidebarRoundedIcon />
                            </IconButton>
                        )}
                    <div className="py-6 h-11 w-11 flex items-center cursor-pointer"
                        onClick={() => {
                            setId(null)
                            setSelected(null)
                            router.push('/logs');
                        }}

                    >
                        <Image
                            src={"/images/frame.png"}
                            alt="Logo"
                            layout="responsive"
                            width={6}
                            height={6}
                            className="transition-transform duration-500 transform hover:scale-105"
                        />
                    </div>
                    {/* <p
                            className="font-bold text-inherit text-lg px-2 cursor-pointer">Pastelog</p> */}
                </div>
            </NavbarContent>
            <NavbarContent justify="end">
                <ThemeSwitcher />
            </NavbarContent>
        </Navbar>
    )
}
export default PSNavbar;