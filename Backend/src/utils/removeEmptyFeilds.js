export const removeEmptyField = (obj) => {
 if(!obj || typeof obj !== "object") return obj;

 const result = Array.isArray(obj)? [] : {};

 for(const [key,value] of Object.entries(obj)){
    if(value === undefined || value === null) continue;
    if (typeof value === "string") {
        if (value.trim() === "") continue;
        result[key]=value;
        continue;
    }

    if (Array.isArray(value)) {
        const cleanedArray = value
        .map((item)=>
        typeof item === "object" && item !==null ? removeEmptyField(item) : item
        )
        .filter((x)=>{
            if (x === undefined || x === null) return false;
            if(typeof x === "string" && x.trim() === false);
            if(typeof x === "object" && Object.keys(x).length===0) return false;
            return true;
        });

        if (cleanedArray.length ===0) continue;
        result[key] = cleanedArray;
        continue;
    }
     if (typeof value === "object") {
      const nested = removeEmptyField(value);
      if (Object.keys(nested).length === 0) continue;
      result[key] = nested;
      continue;
    }
        result[key] = value;
 }
 return result;
}