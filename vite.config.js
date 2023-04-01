import react from '@vitejs/plugin-react'

export default {
    build: {
        rollupOptions: {
            input: './src/index.tsx'
        }
    },
    resolve: {
        extensions: ['.js', '.ts', '.jsx', '.tsx']
    },
    plugins: [react()],
}