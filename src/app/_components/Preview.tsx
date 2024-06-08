"use client";
import Editor from '@/app/_components/Editor';
import PSNavbar from '@/app/_components/PSNavbar';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DoneIcon from '@mui/icons-material/Done';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Log from '../_models/Log';
import LogService from '../_services/logService';
import IconButton from './IconButton';
const Preview = (props: { id: string }) => {
    const logService = new LogService();
    const [loading, setLoading] = useState<boolean>(true);
    const [log, setLog] = useState<Log>();
    const [copied, setCopied] = useState<boolean>(false);
    const { theme } = useTheme();
    const id = props.id;

    async function fetchLogsById() {
        setLoading(true);
        const logById = await logService.fetchLogById(id as string);
        if (!logById) {
            setLoading(false);
            // router.push('/404');
            return;
        }
        setLog(logById);
        setLoading(false);
    }
    useEffect(() => {
        fetchLogsById()
    }, []);
    return (
        <div className='flex flex-col items-center h-max'>
            <PSNavbar />
            <div className="w-full md:w-3/4 lg:w-2/3 max-w-none px-1 prose prose-indigo dark:prose-dark">
                {loading ? (
                    <div className="absolute inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50">
                        <div className="loader" />
                    </div>
                ) : (
                    <div className='flex flex-col'>
                        <p className="text-black dark:text-slate-50 my-1">{log?.title}</p>
                        <div className='flex flex-row'>
                            <p className="text-black dark:text-slate-50 my-1 font-bold">
                                {`Expires: `}
                            </p>
                            <p className="text-black dark:text-slate-50 my-1"> {` ${log?.expiryDate?.toDateString()}`}</p>
                        </div>
                        <div className="relative">
                            <IconButton
                                className='absolute top-2 right-2 '
                                onClick={() => {
                                    navigator.clipboard.writeText(log?.data as string);
                                    setCopied(true);
                                    setTimeout(() => {
                                        setCopied(false);
                                    }, 2000);
                                }}
                                ariaLabel="Copy to clipboard"
                            >{!copied ?
                                (<ContentCopyIcon />)
                                :
                                (<DoneIcon
                                    color='success'
                                />)
                                }
                            </IconButton>
                            <Editor
                                preview={true}
                                className={`${theme !== 'dark' ? ` bg-slate-200 text-black min-h-screen` : `bg-gray-700 text-white min-h-screen`}`}
                                value={log?.data}
                                disabled={loading}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Preview;