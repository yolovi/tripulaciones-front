 /* FORMATEO FECHA */ //tambien se podría haber usado la librería datejs (npm)
 export const formatDate = (isoDateString) => {
    const options = { day: "numeric", month: "long" };
    return new Date(isoDateString).toLocaleDateString("es-ES", options);
    
};