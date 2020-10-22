
import styled from "styled-components";
export const StyledMessage = styled.div`
    display: flex;
    align-content: center;
    padding: 0 5% 0 5%;
    justify-content: ${props => props.self ? 'flex-end' : 'flex-start'};
    p {
        text-align: center;
        padding: 5px;
    border: 1px solid black;
    border-radius: 4px;
    }
`