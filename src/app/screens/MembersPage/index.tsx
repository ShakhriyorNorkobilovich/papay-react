import React, { useMemo } from 'react';
import { Container } from "@mui/material";
import { Route, Switch, useLocation, useRouteMatch } from "react-router-dom";
import { VisitOtherPage } from './VisitOtherPage';
import { VisitMyPage } from './VisitMyPage';
import "../../../css/my_page.css";

function useQuery() {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
  }


export function MemberPage(props: any){
    const query = useQuery();
    console.log("QUERY TEST", query.get("test"));
    let member = useRouteMatch();
    // console.log(member)

    const chosen_mb_id: string | null = query.get("mb_id") ?? null;
    const chosen_art_id: string | null = query.get("art_id") ?? null;

    return(
        <div className='restaurant_page'>
            <Switch>
                <Route path={`${member.path}/other`}>
                    <VisitOtherPage
                        chosen_mb_id={chosen_mb_id}
                        chosen_art_id={chosen_art_id}
                    />
                </Route>
                <Route path={`${member.path}`}>
                    <VisitMyPage/>
                </Route>
            </Switch>
        </div>
    );
}