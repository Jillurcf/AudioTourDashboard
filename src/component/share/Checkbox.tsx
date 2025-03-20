// import React, { ReactNode } from "react";
// import Select, { Props as SelectProps } from "react-select";
// import { GroupBase, OptionsOrGroups } from "react-select";
// import PropTypes from "prop-types";

// interface Shapes {
//   round: string;
//   square: string;
// }

// interface Variants {
//   fill: {
//     [key: string]: string;
//   };
//   outline: {
//     [key: string]: string;
//   };
// }

// interface Sizes {
//   sm: string;
//   md: string;
//   lg: string;
//   xl: string;
//   xs: string;
// }

// interface SelectBoxProps extends SelectProps {
//   className?: string;
//   options?: OptionsOrGroups<unknown, GroupBase<unknown>>;
//   isSearchable?: boolean;
//   isMulti?: boolean;
//   indicator?: ReactNode;
//   shape?: keyof Shapes;
//   variant?: keyof Variants;
//   size?: keyof Sizes;
//   color?: string;
//   children?: ReactNode;
// }

// const shapes: Shapes = {
//   round: "rounded-md",
//   square: "rounded-[0px]",
// };

// const variants: Variants = {
//   fill: {
//     foundation_maastricht_blue_maastricht_blue_50_1:
//       "bg-foundation-maastricht_blue-maastricht_blue_50-1 text-foundation-black-black_300",
//     foundation_floral_white_floral_white_500:
//       "bg-foundation-floral_white-floral_white_500 text-foundation-primary_black-primary_black_400",
//   },
//   outline: {
//     foundation_black_black_500_0: "text-foundation-black-black_400-0",
//   },
// };

// const sizes: Sizes = {
//   sm: "h-[36px] pr-[34px] text-[16px]",
//   md: "h-[40px] px-[34px] text-[16px]",
//   lg: "h-[50px] p1-5 pr-[34px] text-[16px]",
//   xl: "h-[54px] p1-4 pr-[34px] text-[16px]",
//   xs: "h-[28px] pr-[10px] text-[16px]",
// };

// const SelectBox = React.forwardRef<any, SelectBoxProps>(
//   (
//     {
//       children,
//       className = "",
//       options = [],
//       isSearchable = false,
//       isMulti = false,
//       indicator,
//       shape,
//       variant = "outline",
//       size = "xs",
//       color = "foundation_black_black_500_0",
//       ...restProps
//     },
//     ref
//   ) => {
//     const [menuPortalTarget, setMenuPortalTarget] = React.useState<HTMLElement | null>(null);

//     React.useEffect(() => {
//       setMenuPortalTarget(document.body);
//     }, []);

//     return (
//       <>
//         <Select
//           ref={ref}
//           options={options}
//           className={`${className} flex ${(shape && shapes[shape]) || ""} ${
//             (size && sizes[size]) || ""
//           } ${(variant && variants[variant]?.[color]) || ""}`}
//           isSearchable={isSearchable}
//           isMulti={isMulti}
//           components={{
//             IndicatorSeparator: () => null,
//             ...(indicator && { DropdownIndicator: () => indicator }),
//           }}
//           styles={{
//             container: (provided) => ({
//               ...provided,
//               zIndex: 0,
//             }),
//             control: (provided) => ({
//               ...provided,
//               backgroundColor: "transparent",
//               border: "0 !important",
//               boxShadow: "0 !important",
//               minHeight: "auto",
//               width: "100%",
//               "&:hover": {
//                 border: "0 !important",
//               },
//             }),
//             input: (provided) => ({
//               ...provided,
//               color: "inherit",
//             }),
//             option: (provided) => ({
//               ...provided,
//               color: "#000",
//             }),
//             valueContainer: (provided) => ({
//               ...provided,
//               padding: 0,
//             }),
//             placeholder: (provided) => ({
//               ...provided,
//               margin: 0,
//             }),
//             menuPortal: (base) => ({ ...base, zIndex: 999999 }),
//             menu: ({ width, ...css }) => ({ ...css }),
//           }}
//           menuPortalTarget={menuPortalTarget}
//           closeMenuOnScroll={(event) => {
//             return event.target instanceof HTMLElement && event.target.id === "scrollContainer";
//           }}
//           {...restProps}
//         />
//         {children}
//       </>
//     );
//   }
// );

// SelectBox.propTypes = {
//   className: PropTypes.string,
//   options: PropTypes.array,
//   isSearchable: PropTypes.bool,
//   isMulti: PropTypes.bool,
//   indicator: PropTypes.node,
//   shape: PropTypes.oneOf(["round", "square"]),
//   size: PropTypes.oneOf(["sm", "md", "lg", "xl", "xs"]),
//   variant: PropTypes.oneOf(["fill", "outline"]),
//   color: PropTypes.string,
//   children: PropTypes.node,
// };

// export { SelectBox };
