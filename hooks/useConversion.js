
import React, { useEffect, useState } from 'react';
import { CLICKTIME, DEFAULT_SUBIDS, SUBID } from '../constants/conversion-report-constants';

export default useConversion = (conversionReport) => {
  const [selectedSubIds, setSelectedSubIds] = useState(DEFAULT_SUBIDS);
  const [displayType, setDisplayType] = useState('1');
  const [displayData, setDisplayData] = useState([]);
  const [toBeRemoveSubIds, setToBeRemoveSubIds] = useState([]);
  

  useEffect(() => {
    getFilteredConversionReport();
  },[conversionReport])

  useEffect(() => {
    getFilteredConversionReport();
  },[displayType])

  useEffect(() => {
    getFilteredConversionReport();
  },[toBeRemoveSubIds])

  const getIndicator = (isExpanded, hasChildrenNodes) => {
    if (!hasChildrenNodes) {
      return '-'
    } else if (isExpanded) {
      return '-'
    } else {
      return '+'

    }
  }
  const getTax = (isToggled, grandTotal) => {
    const taxPercentage = isToggled ? 0.05 : 0.1;
    return parseFloat(parseFloat(grandTotal) * taxPercentage).toLocaleString();
  }
  const getNetProft = (isToggled, grandTotal) => {
    const taxPercentage = isToggled ? 0.05 : 0.1;

    return parseFloat(grandTotal - (grandTotal * taxPercentage)).toLocaleString();
  }
  const getFilteredConversionReport = () => {
    console.log(displayType);
    if(displayType === SUBID){
      setDisplayData([]);
      return;
    }
    else{
      if(toBeRemoveSubIds.length === 0){
        setDisplayData(conversionReport);
      }
      let filteredData = [];
      let node;
      for (const conversionNode of conversionReport) {
        node = removeLevels(conversionNode, toBeRemoveSubIds);
        if(node.level === 1 && toBeRemoveSubIds.includes(1)){
          if(node.children && node.children.length > 0){ 
            for(const childNode of node.children){
              filteredData.push(childNode); // if level 1 is included, push the child nodes instead.
            }
          }
        }
        else{
          filteredData.push(node);
        }
      }
      setDisplayData(filteredData);
    }
  }
  
  const removeLevels = (node, levelsToRemove) => {
    if (!node.children || node?.children?.length === 0) {
      return node; // If no children, return
    }
  
    for (let i = 0; i < node.children.length; i++) {
      const child = node.children[i];
      const childLevel = child.level;
      if (levelsToRemove.includes(childLevel)) {
        const grandChildren = child.children || []; // If child node is at a level to be removed,
        node.children.splice(i, 1, ...grandChildren); // move its children up to the current node's parent,
        removeLevels(node, levelsToRemove); // and delete the current node
      } else {
        removeLevels(child, levelsToRemove);  // If child node is not at a level to be removed,recursively remove levels from its children
      }
    }
    return node;
  }


  const onClose = () => {
    setToBeRemoveSubIds(DEFAULT_SUBIDS.filter((item) => !selectedSubIds.includes(item)));
  };

  return {
    selectedSubIds, 
    setSelectedSubIds, 
    getIndicator, 
    getTax, 
    getNetProft,
    getFilteredConversionReport,
    displayType,
    setDisplayType,
    displayData,
    onClose
  };
}
