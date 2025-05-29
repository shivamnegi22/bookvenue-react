import React, { useState, useEffect } from "react";
import { TreeTable } from "primereact/treetable";
import { Column } from "primereact/column";
import "../../css/BecomeProvider.css";

const YourtableData = () => {
  const [nodes, setNodes] = useState([]);

  const products = [
    { id: 1000, name: "Product 1", price: 50 },
    { id: 1001, name: "Product 2", price: 70 },
    { id: 1002, name: "Product 3", price: 65 },
  ];
  const NodeService = {
    getTreeNodesData() {
      return [
        {
          key: "0",
          label: "Documents",
          data: "Documents Folder",
          icon: "pi pi-fw pi-inbox",
          children: [
            {
              key: "0-0",
              label: "Work",
              data: "Work Folder",
              icon: "pi pi-fw pi-cog",
              children: [
                {
                  key: "0-0-0",
                  label: "Expenses.doc",
                  icon: "pi pi-fw pi-file",
                  data: "Expenses Document",
                },
                {
                  key: "0-0-1",
                  label: "Resume.doc",
                  icon: "pi pi-fw pi-file",
                  data: "Resume Document",
                },
              ],
            },
            {
              key: "0-1",
              label: "Home",
              data: "Home Folder",
              icon: "pi pi-fw pi-home",
              children: [
                {
                  key: "0-1-0",
                  label: "Invoices.txt",
                  icon: "pi pi-fw pi-file",
                  data: "Invoices for this month",
                },
              ],
            },
          ],
        },
        {
          key: "1",
          label: "Events",
          data: "Events Folder",
          icon: "pi pi-fw pi-calendar",
          children: [
            {
              key: "1-0",
              label: "Meeting",
              icon: "pi pi-fw pi-calendar-plus",
              data: "Meeting",
            },
            {
              key: "1-1",
              label: "Product Launch",
              icon: "pi pi-fw pi-calendar-plus",
              data: "Product Launch",
            },
            {
              key: "1-2",
              label: "Report Review",
              icon: "pi pi-fw pi-calendar-plus",
              data: "Report Review",
            },
          ],
        },
        {
          key: "2",
          label: "Movies",
          data: "Movies Folder",
          icon: "pi pi-fw pi-star-fill",
          children: [
            {
              key: "2-0",
              icon: "pi pi-fw pi-star-fill",
              label: "Al Pacino",
              data: "Pacino Movies",
              children: [
                {
                  key: "2-0-0",
                  label: "Scarface",
                  icon: "pi pi-fw pi-video",
                  data: "Scarface Movie",
                },
                {
                  key: "2-0-1",
                  label: "Serpico",
                  icon: "pi pi-fw pi-video",
                  data: "Serpico Movie",
                },
              ],
            },
            {
              key: "2-1",
              label: "Robert De Niro",
              icon: "pi pi-fw pi-star-fill",
              data: "De Niro Movies",
              children: [
                {
                  key: "2-1-0",
                  label: "Goodfellas",
                  icon: "pi pi-fw pi-video",
                  data: "Goodfellas Movie",
                },
                {
                  key: "2-1-1",
                  label: "Untouchables",
                  icon: "pi pi-fw pi-video",
                  data: "Untouchables Movie",
                },
              ],
            },
          ],
        },
      ];
    },

    getTreeTableNodesData() {
      return [
        {
          key: "0",
          data: {
            name: "Indoor",
            size: "100kb",
            type: "Folder",
          },
          children: [
            {
              key: "0-0",
              data: {
                name: "Doon Sports Academy",
                size: "25kb",
                type: "Folder",
              },
              children: [
                {
                  key: "0-0-0",
                  data: {
                    name: "Court 1",
                    size: "10kb",
                    type: "Application",
                  },
                },
                {
                  key: "0-0-1",
                  data: {
                    name: "Court 2",
                    size: "10kb",
                    type: "Application",
                  },
                },
              ],
            },
          ],
        },
        {
          key: "1",
          data: {
            name: "Cloud",
            size: "20kb",
            type: "Folder",
          },
          children: [
            {
              key: "1-0",
              data: {
                name: "backup-1.zip",
                size: "10kb",
                type: "Zip",
              },
            },
            {
              key: "1-1",
              data: {
                name: "backup-2.zip",
                size: "10kb",
                type: "Zip",
              },
            },
          ],
        },
        {
          key: "2",
          data: {
            name: "Desktop",
            size: "150kb",
            type: "Folder",
          },
          children: [
            {
              key: "2-0",
              data: {
                name: "note-meeting.txt",
                size: "50kb",
                type: "Text",
              },
            },
            {
              key: "2-1",
              data: {
                name: "note-todo.txt",
                size: "100kb",
                type: "Text",
              },
            },
          ],
        },
       
      ];
    },
  };

  useEffect(() => {
    Promise.resolve(NodeService.getTreeTableNodesData()).then((data) => setNodes(data));
  }, []);

  return (
    <div className="container">
      <TreeTable value={nodes} tableStyle={{ minWidth: "50rem" }}>
        <Column field="name" header="Facility" expander></Column>
        <Column field="size" header="Services"></Column>
        <Column field="type" header="Courts"></Column>
      </TreeTable>
    </div>
  );
};

export default YourtableData;
