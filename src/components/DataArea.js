import React, {Component} from 'react';
import DataTable from './DataTable';
import Nav from './Nav';
import API from '../utils/API';



//Used Master as reference here

export default class DataArea extends Component{
    state = {
        users: [{}],
        order: "descend",
        filteredUsers: [{}]
    }



    headings = [
        { name: "Image", width: "10%" },
        { name: "Name", width: "10%" },
        { name: "Phone", width: "20%" },
        { name: "Email", width: "20%" },
        { name: "DOB", width: "10%" }
      ]
    

    compare = heading =>{
        if (this.state.order === "descend"){
            this.setState({
                order: "ascend"
            })
        } else {
            this.setState({
                order: "descend"
            });
        }

        const compare = (a, b) => {
            if(a[heading] === undefined){
                return 1;
            } else if (b[heading] === undefined) {
                return -1;
            } else if (heading === "name"){
                return a[heading].first.localCompare(b[heading].first);
            } else {
                if(a[heading] === undefined){
                    return 1;
                } else if (b[heading] === undefined){
                    return -1;
                } else if (heading === "name"){
                    return b[heading].first.localCompare(a[heading].first);
                } else {
                    return b[heading] - a[heading];
                }
            }
        }



        const sortedUsers = this.state.filteredUsers.sort(compare);
        this.setState({filteredUsers: sortedUsers});
    }



    handleSearchChange = event =>{
        const filter = event.target.value;
        const filtered = this.state.users.filter(item => {
            let values = Object.values(item).join("").toLowerCase();
            return values.indexOf(filter.toLowerCase()) !== -1;
        });
        this.setState({filteredUsers: filtered});
    }



    componentDidMount(){
        API.getUsers().then(res =>{
            this.setState({
                users: res.data.results,
                filteredUsers: res.data.results
            });
        });
    }



    render(){
        return (
            <>
                <Nav search = {this.search} />
                <div className = "data-area">
                    <DataTable headings = {this.headings} users = {this.state.filteredUsers} sort = {this.sort} />
                </div>
            </>
        );
    }


}