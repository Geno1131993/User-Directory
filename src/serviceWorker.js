

//Used Master's serviceWorker as a reference

const isLocalHost = Boolean(
    window.location.hostname === "localhost" || window.location.hostname === "[::1]" || window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
);



export function register(config){

    if(process.env.NODE_ENV === "production" && "serviceWorker" in navigator){
        const publicURL = new URL(process.env.PUBLIC_URL, window.location.href);
        if(publicURL.origin !== window.location.origin){
            return;
        }



       window.addEventListener("load", ()=>{
            const url = `${process.env.PUBLIC_URL}/service-worker.js`;
            if(isLocalHost){
                isValid(url, config);
                navigator.serviceWorker.ready();
            }else{
                registerValid(url, config);
             }
        });
    }
}




function registerValid(url, config){
    navigator.serviceWorker
        .register(url).then(registration => {
            registration.onupdatefound = () => {
                const installingWorker = registration.installing;
                if(installingWorker === null){
                    return;
                }
            
                installingWorker.onstatechange = () =>{
                  if(installingWorker.state === "installed"){
                    if(config && config.onUpdate){
                        config.onUpdate(registration);
                    }
                } else{
                    if(config && config.onSuccess){
                        config.onSuccess(registration);
                    }
                }
            }
        }
        }).catch(err =>{ 
            console.log(`Error during service worker registration: ${err}`);
        });

}




function isValid(url, config){
    fetch(url).then(res =>{
        const content = res.headers.get("content-type");

        if(res.status === 404 || (content != null && content.indexOf("javascript") === -1)){
            navigator.serviceWorker.ready.then(registration =>{
                registration.unregister().then( ()=> {
                    window.location.reload();
                });
            });
        } else {
            registerValid(url, config);
        }
    }).catch( ()=>{
        console.log("No internet connection. App is running offline.");
    });
}



export function unregister(){
    if("serviceWorker" in navigator){
        navigator.serviceWorker.ready.then(registration =>{
            registration.unregister();
        });
    }
}




