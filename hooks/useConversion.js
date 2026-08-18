
import React, { useEffect, useState } from 'react';
import { CLICKTIME, DEFAULT_SUBIDS } from '../constants/conversion-report-constants';

export default useConversion = (conversionReport, displayType, setDisplayType) => {
  const [selectedSubIds, setSelectedSubIds] = useState(DEFAULT_SUBIDS);
  const [displayData, setDisplayData] = useState([]);
  const [toBeRemoveSubIds, setToBeRemoveSubIds] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getFilteredConversionReport();
  },[conversionReport, toBeRemoveSubIds])

  const getFilteredConversionReport = () => {
    if (!conversionReport?.length) {
      return;
    }
    if (displayType === CLICKTIME) {
      setDisplayData(conversionReport);
      return;
    }

    const totalCommission = JSON.parse(JSON.stringify(conversionReport)).reduce((sum, node) => {
      return sum + (node.level !== 0 ? node.totalCommission : 0);
    }, 0);
  
    const filteredData = JSON.parse(JSON.stringify(conversionReport)).map(node => {
      const newNode = removeLevels(node, toBeRemoveSubIds);
      if (newNode.level === 1 && toBeRemoveSubIds.includes(1)) {
        return newNode.children || [];
      } else {
        return newNode;
      }
    }).flat();
  
    const totalFilteredCommission = filteredData.reduce((sum, node) => {
      return sum + (node.level !== 0 ? node.totalCommission : 0);
    }, 0);
  
    filteredData[filteredData.length - 1].totalCommission += (totalCommission - totalFilteredCommission);
  
    const sortedData = [...filteredData].sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
  
    const blankObject = sortedData.shift();
    sortedData.push(blankObject);
  
    setDisplayData(sortedData);
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

  const onChange = (type, value) => {
    if(type === 'radio'){
      setDisplayType(value);
    }else{
      setSelectedSubIds(value);
    }
  }
  const onPress = () => {
    if(isOpen){
      setToBeRemoveSubIds(DEFAULT_SUBIDS.filter((item) => !selectedSubIds.includes(item)));
    }
    setIsOpen(!isOpen);
  }
  return {
    selectedSubIds, 
    getFilteredConversionReport,
    setDisplayType,
    displayData,
    onChange,
    onPress,
    isOpen
  };
}
