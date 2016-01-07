/**
 * Created by Nikita on 24.12.2015.
 */
export default {
    get: function(key){
        try{
            return JSON.parse(localStorage.getItem(key));
        }
        catch(e){
            return null;
        }
    },
    set: function(key, val){
        localStorage.setItem(key, JSON.stringify(val));
    }
};