import os from "os"

let NETWORK = {};
const connectedIfaces = [];
const ilist = [];

export default class IfacesDAO{
    
    static async getNetworkInterfaces () {

        try {

            const interfaces = os.networkInterfaces();
            for (let iface in interfaces) {
                for (let i in interfaces[iface]) {
                    const f = interfaces[iface][i];
                    if (iface === "WiFi" && f.family==="IPv4") {
                    ilist.push({ f,iface });
                    } else (
                        connectedIfaces.push({f,iface})
                    )
                }
            }

            NETWORK = ilist;
            let networks = {NETWORK, connectedIfaces }
            return ( networks );
            
        } catch (error) {
            console.log("Cannot access interfaces data");
        }
        
    }
}