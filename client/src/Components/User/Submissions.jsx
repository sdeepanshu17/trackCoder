import { useEffect, useState } from 'react';
import { Icon, makeStyles, Paper, Table, TableBody, Typography, TableCell, TableContainer, TableHead, TablePagination, TableRow, CircularProgress } from '@material-ui/core';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import codeforces from "../../assets/codeforces-svgrepo-com.svg"
import leetcode from "../../assets/leetcode-svgrepo-com.svg"
import codechef from "../../assets/codechef-svgrepo-com.svg"
import atcoder from "../../assets/atcoder.png"
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme)=>({
    imageIcon: {
        height: 28,
        width: 28,
        opacity: '40%',
    },
    iconRoot: {
        height: 28,
        width: 28,
        textAlign: 'center',
    },
    loadingPaper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        borderRadius: '15px',
        height: '39vh',
        width: '100vw'
    },
    tablePaper: {
        width: '100%',
        overflow: 'hidden',
        margin: '10px 10px 40px 10px',
    },
    tableCell: {
        textDecoration: 'none',
        color: 'black',
        [theme.breakpoints.down("sm")]: {
            fontSize: '14px'
        },
    },
    tableCellLink: {
        color: 'black',
        textDecoration: "underline",
        [theme.breakpoints.down("sm")]: {
            fontSize: '14px'
        },
    }
}))


const columns = [
    { id: 'oj', label: 'Website' },
    { id: 'problem', label: 'Problem' },
    { id: 'verdict', label: 'Verdict' },
    { id: 'submissionUrl', label: 'Submission' },
    { id: 'submissionTime', label: 'Submission Time' },
];

export default function Submissions(props) {
    const classes = useStyles();
    const { rows } = props;
    const {isLoading} = useSelector((state)=>state.auth);
    // console.log(rows1);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    function convertToIST(timestamp) {
        const milliseconds = timestamp * 1000; // Convert seconds to milliseconds
        const date = new Date(milliseconds);
        const options = { timeZone: 'Asia/Kolkata', hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        return date.toLocaleString('en-IN', options);
    }

    if (isLoading) {
        return <Paper elevation={6} className={classes.loadingPaper}>
            <CircularProgress size='7em' />
        </Paper>
    }

    if (!rows) {
        return <></>
    }

    return (
        <Paper className={classes.tablePaper} elevation={4}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.timestamp}>
                                        <TableCell key="oj" >
                                            <Icon component={Link} to={row.profileUrl} target={"_blank"} classes={{root: classes.iconRoot}}>
                                                {row["oj"]==="atcoder" && <img className={classes.imageIcon} src={atcoder} />}
                                                {row["oj"]==="codeforces" && <img className={classes.imageIcon} src={codeforces} />}
                                                {row["oj"]==="leetcode" && <img className={classes.imageIcon} src={leetcode} />}
                                                {row["oj"]==="codechef" && <img className={classes.imageIcon} src={codechef} />}
                                            </Icon>
                                        </TableCell>
                                        <TableCell key="problem" >
                                            <Typography className={classes.tableCellLink} component={Link} to={row.problemUrl} target={"_blank"}>{row["problem"]}</Typography>
                                        </TableCell>
                                        <TableCell key="verdict" >
                                            <Typography className={classes.tableCell}>{row["verdict"] == "WRONG_ANSWER" ? "WA" : row["verdict"]}</Typography>
                                        </TableCell>
                                        <TableCell key="submission" >
                                            <Typography className={classes.tableCellLink} component={Link} to={row.submissionUrl} target={"_blank"}>View Code</Typography>
                                        </TableCell>
                                        <TableCell key="submissionTime" >
                                            <Typography className={classes.tableCell}>{convertToIST(row["timestamp"])}</Typography>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

Submissions.propTypes = {
    rows: PropTypes.array,
}