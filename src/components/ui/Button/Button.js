import styled, { css } from "styled-components";

const Button = styled.button`
    padding: 0.8rem 2rem;
    border: none;
    border-radius: 10px;
    color: #fff;
    background-color: ${(props) =>
        props.theme.colors[props.variant] || props.theme.colors["primary"]
    };
    cursor: pointer;

    // props full
    ${(props) =>
        props.full &&
        css`
            display: block;
            width: 100%;
        `}
    
    // props size
    ${(props) =>
        props.size &&
        css`
            font-size: ${props.theme.sizes[props.size].fontSize};
            padding: ${props.theme.sizes[props.size].padding};
        `}
`;

Button.defaultProps = {
    variant: "primary", // Set default variant to primary
    size: "md" // Set default size to md
};

export default Button;