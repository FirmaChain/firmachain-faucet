import { CircularProgress } from "@material-ui/core";

export function LoadingProgress(open) {
    return (
        <>
        {open.open && 
            <div style={{width: '100vw', height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.2)', position: 'absolute', top: '0', alignItems: 'center', justifyContent:'center', display:'flex', zIndex: '99999'}}>
                <CircularProgress />
            </div>
        }
        </>
    )
}
