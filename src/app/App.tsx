import { RouterProvider } from 'react-router-dom';
import { router } from '@/app/routes';

import { CssBaseline, InitColorSchemeScript } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import { theme } from '@/shared/theme';
import '@/shared/styles/globals.css';
import '@/shared/styles/lexical.css';

import { QueryClientProvider } from '@tanstack/react-query';
import { AlertProvider } from '@/app/providers/AlertProvider';
import { queryClient } from '@/shared/api/queryClient';


function App() {

    return (
        <>
            <InitColorSchemeScript
                attribute='data'
                defaultMode='system'
                modeStorageKey='bluecool-adm-color'
            />

            <ThemeProvider
                theme={theme}
                defaultMode='system'
                modeStorageKey='bluecool-adm-color'
                disableTransitionOnChange
                noSsr
            >
                <CssBaseline />
                <AlertProvider>
                    <QueryClientProvider client={queryClient}>
                        <RouterProvider router={router} />
                    </QueryClientProvider>
                </AlertProvider>
            </ThemeProvider>
        </>
    )
}

export default App
