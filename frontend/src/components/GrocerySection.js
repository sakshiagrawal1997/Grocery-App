import {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";
import classNamesModule from "classnames";
import {AddGroceryItem} from "./AddGroceryItem";
const API_BASE_URL = "http://localhost:8080";
export function GrocerySection() {
    const [groceryItems, updateGroceryItems] = useState([]);
    const history = useHistory();
    async function fetchGroceryItems() {
        const groceryData = await axios.get(`${API_BASE_URL}/grocery/getAll`);
        const dataFromAPI = groceryData.data.results;
        updateGroceryItems(dataFromAPI);
    }
    useEffect(()=>{
        fetchGroceryItems();
    }, []);
    
    async function handlePurchaseUpdate(item) {
            console.log(item);
            const updateData = await axios.put(`${API_BASE_URL}/grocery/updatePurchasestatus`, 
            {
                "_id": item._id,
                "isPurchased": true
            }
            );
            console.log(updateData);
            alert("Item purchase status updated successfully");
            fetchGroceryItems();
    }
    async function handleDeleteOperation(item) {
        const deleteResponse = await axios.delete(
            `${API_BASE_URL}/grocery/deleteGroceryItem`, 
            {
                data: {
                    "_id": item._id,
                },
            }
        );
        console.log(deleteResponse);
        alert ("Data deleted successfully");
        fetchGroceryItems();
    }
    function renderPurchaseButton(item) {
    if(item.isPurchased === false) {
      return (
          <div className="me-3">
              <button 
                 className="btn btn-success" 
                 onClick={() => handlePurchaseUpdate(item)}
                >
                     Purchased
              </button>
          </div>
      ); 
    } else {
        return <div></div>;
    }
    }
    function renderDeleteButton(item) {
        return(
        <div>
            <button className="btn btn-danger" 
                 onClick={() => handleDeleteOperation(item)}
              > 
                x
            </button>
        </div>
        );
    }
    function handleLogout() {
        localStorage.removeItem("userToken");
        history.push("/login");
    }
   
    function renderGroceryItems() {
        return groceryItems.map((item)=> {
            return (
            <div className={classNamesModule("grocery-item d-flex", {
                  purchased: item.isPurchased === true,
            })}
            key = {item.groceryItem}
            > 
             <div>{item.groceryItem}</div> 
             <div className="grocery-actions d-flex">
                 {renderPurchaseButton(item)}
                 {renderDeleteButton(item)}
               </div>
             </div>
            );
        });
    }
    return(
        < div className="d-flex justify-content-center align-items-center flex-column w-100">
            <h3>Plan for the month of May </h3>
            <div className= "w-50">
            <AddGroceryItem 
            baseUrl= {API_BASE_URL} 
            fetchGroceryItems = {fetchGroceryItems}
            />
            {renderGroceryItems()}
            </div>
            <div>
                <button className={"btn btn-danger mt-4"} onClick={() => handleLogout()}>
                   Logout
                </button>
            </div>
        </div>
    );
}