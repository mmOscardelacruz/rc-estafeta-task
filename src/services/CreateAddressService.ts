import axios from 'axios';
import config from '../config';
import { Coordinates } from '../interfaces/Geotab/Trip';
const {goAddressURL,goAddressKey} = config.geotab;




  export async function createAddress(coords: Coordinates) {
    try {
      const config = {
        headers: {
          'key': goAddressKey,
      }
      }
      const data = [coords];
      const result = await axios.post(goAddressURL,data,config);
      
      if(result.status !== 200){
        return 'Address not found'
      }

      return result.data[0].address;
    } catch (error) {
      throw error;
    }
  }