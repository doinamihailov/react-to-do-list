import React, { Component } from 'react';
import AddIcon from '@material-ui/icons/Add';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CreateIcon from '@material-ui/icons/Create';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { Col, Row, Form } from "react-bootstrap";
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CloseIcon from '@material-ui/icons/Close';
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';

import './List.css';
import { Container } from '@material-ui/core';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            elements : [
                { id: 1, name : 'Groceries', check : false, edit : false},
                { id: 2, name : 'Call mom and dad', check : false, edit : false},
                { id: 3, name : 'Feed the dog', check : false, edit : false}
            ],
            newI : false,
            value : '',
            id: -1,
            anchorEl: null,
        };
        this.newItem = this.newItem.bind(this);
        this.sortList = this.sortList.bind(this);
        this.sortListDesc = this.sortListDesc.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    handleClickOrder = (event) => {
        this.setState({
            anchorEl: event.currentTarget,
        })
      };
      handleCloseOrder = () => {
            this.setState({
            anchorEl: null
            })
       };

    newItem() {
        this.setState({
            newI: true
        })
    }
    sortList() {
        const newlist = this.state.elements.sort((a, b) => (a.name > b.name) ? 1 : -1)
        this.setState({
            elements: newlist
        })
    }
    sortListDesc() {
        const newlist = this.state.elements.sort((a, b) => (a.name < b.name) ? 1 : -1)
        this.setState({
            elements: newlist
        })
    }

    checkItem(id) {
        const index = this.state.elements.findIndex(item => item.id === id)
        var newlist = this.state.elements;
        newlist[index].check = !newlist[index].check
        this.setState({
            elements: newlist
        })
    }

    editItem(item) {
        const index = this.state.elements.findIndex(i => i.id === item.id)
        var newlist = this.state.elements;
        newlist[index].edit = !newlist[index].edit
        this.setState({
            elements: newlist,
            value: item.name,
            id: item.id
        })
    }

    deleteItem(id) {
        const newlist = this.state.elements.filter(x => x.id !== id);
        this.setState({
            elements: newlist
        })
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }
    
    handleSubmit(event) {
        var newlist = this.state.elements;
        if (this.state.value[0] >= 'a' && this.state.value[0] <= 'z') {
            this.state.value = this.state.value[0].toUpperCase() + this.state.value.slice(1);
        }
        if (this.state.value !== '')
            newlist.push(
                { id : newlist.length + 1, name : this.state.value, check : false, edit : false }
            );
        this.setState({
            newI: false,
            value: '',
            elements: newlist
        })
        event.preventDefault();
    }

    handleEdit(event) {
        const index = this.state.elements.findIndex(item => item.id === this.state.id)
        var newlist = this.state.elements;
        newlist[index].name = this.state.value
        newlist[index].edit = false
        this.setState({
            elements: newlist
        })
        event.preventDefault();
        this.setState({
            value: '',
            id: -1,
        })
    }


    handleClose(event) {
        this.setState({
            newI: false,
            value: ''
        })
    }
    handleCloseEdit(item) {
        this.editItem(item);
        this.setState({
            value: '',
            id: -1,
        });
    }

    insertNew () {
        if (this.state.newI)
            return (
                <TableRow>

                    <TableCell>
                    </TableCell>
                    <TableCell align='center' width='80%' >
                        <form onSubmit={this.handleSubmit} style={{marginLeft : '50px'}}>
                            <label>
                            <textarea
                                type="text" 
                                value={this.state.value} 
                                onChange={this.handleChange} 
                                style={{
                                    height: '20px',
                                    width: '150px'}}
                            >        
                            </textarea>
                            </label>
                            <button type="submit" 
                                onClick={this.handleClick}
                                style={{padding : 0, border: 'none', background : 'none', cursor : 'pointer', outline : 0}}
                            >
                                <FavoriteBorderIcon style={{marginLeft : '10px', marginTop: '0px', color: '#E65100'}}/>

                            </button>
                            <button type="submit" 
                                onClick={this.handleClose}
                                style={{padding : 0, border: 'none', background : 'none', cursor : 'pointer', outline : 0}}
                            >
                                <CloseIcon/>
                            </button>
                        </form>
                    </TableCell>
                    <TableCell>
                    </TableCell>
                </TableRow>
            )
        return null;
    }

    renderCheck(item) {
        if (!item.check)
            return (
                <button 
                    onClick={() => { this.checkItem(item.id)}}
                    style={{padding : 0, border: 'none', background : 'none', cursor : 'pointer', outline : 0}}
                >
                    <RadioButtonUncheckedIcon/>
                </button>
            )
        return (
            <button 
                onClick={() => { this.checkItem(item.id)}}
                style={{padding : 0, border: 'none', background : 'none', cursor : 'pointer', outline : 0, color : '#22E600'}}
            >
                <CheckCircleOutlineIcon/>
            </button>
            )
    }
    renderItem (item) {
        if(!item.edit)
            return (
                <div>
                    {item.name}
                </div>
            )
        return (
            <form onSubmit={this.handleEdit} style={{marginLeft : '50px'}}>
                        <label>
                        <textarea
                                type="text" 
                                value={this.state.value} 
                                onChange={this.handleChange} 
                                style={{
                                    height: '20px',
                                    width: '150px'}}
                            >        
                            </textarea>
                        </label>
                        <button type="submit" 
                            onClick={this.handleEdit}
                            style={{padding : 0, border: 'none', background : 'none', cursor : 'pointer', outline : 0}}
                        >
                            <FavoriteBorderIcon style={{marginLeft : '10px', marginTop: '0px', color: '#E65100'}}/>

                        </button>
                        <button type="submit" 
                            onClick={() => { this.handleCloseEdit(item)}}
                            style={{padding : 0, border: 'none', marginLeft : '0px', background : 'none', cursor : 'pointer', outline : 0}}
                        >
                            <CloseIcon/>
                        </button>
                    </form>
        )
    }

    render() {
        return (
            <div>
                <h1 style={{fontFamily: "Archivo Black"}}>
                    TO DO list
                </h1>
                <TableContainer >
                    <Table >
                        <TableBody> 
                            { this.state.elements.map((item,i) => 
                            <TableRow >
                                <TableCell align='center'>
                                    {this.renderCheck(item)}
                                </TableCell>
                                <TableCell align='center' width='80%'>
                                    {this.renderItem(item)}
                                </TableCell >
                                <TableCell align='center'>
                                    <button 
                                        onClick={() => { this.editItem(item)}}
                                        style={{padding : 0, border: 'none', background : 'none', cursor : 'pointer', outline : 0}}
                                    >
                                        <CreateIcon/>
                                    </button>
                                    <button 
                                        onClick={() => { this.deleteItem(item.id)}}
                                        style={{padding : 0, border: 'none', background : 'none', cursor : 'pointer', outline : 0}}
                                    >
                                        <DeleteOutlineIcon/>
                                    </button>
                                </TableCell>
                            </TableRow>
                    )}
                            {this.insertNew()}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div style={{marginLeft : '-60px', marginTop : '30px'}}>
                    <div style={{align : 'center'}}>
                    <button onClick={this.newItem} style={{padding : 0, border: 'none', background : 'none', cursor : 'pointer', outline : 0, marginRight : '40px'}}>
                        <AddIcon/>
                    </button>

                    <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={this.handleClickOrder}
                    >
                         <SortByAlphaIcon style={{marginTop : '-15px'}}/>
                    </IconButton>
                    <Menu
                        id="simple-menu"
                        anchorEl={this.state.anchorEl}
                        keepMounted
                        open={Boolean(this.state.anchorEl)}
                        onClose={this.handleCloseOrder}
                    >
                    <MenuItem style={{color: 'black'}} onClick={this.sortList}>Sort A -> Z</MenuItem>
                    <MenuItem style={{color: 'black'}} onClick={this.sortListDesc}>Sort Z -> A</MenuItem>
                    </Menu>
                    </div>
                </div>
            </div>
        )
    }
}


export default List;