"use client";

import { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector, RootState } from "../../../store";
import { getDocument, addDocument, updateDocument, deleteDocument } from "../../../store/documents/actions";
import Link from "next/link";

interface DocumentDetails {
  documentId?: string;
  documentType: string;
  file: File | null;
  fileName: string;
  UserId?: string;
}

export default function DocumentUploadPage() {
  const dispatch = useAppDispatch();
  const {
      application: {
        bearerToken,
        id,
        apiState: { status, isError, message },
      },
      document: {
        document: { rows, count } 
      }
    } = useAppSelector((state: RootState) => state);

  const [isEditing, setIsEditing] = useState(false);
  const [fetch, setFetch] = useState(true);
  const [currentDocument, setCurrentDocument] = useState<DocumentDetails>({
    documentId: "",
    documentType: "",
    file: null,
    fileName: "",
    UserId: id
  });

  const fetchDocuments = async () => {
        try {
          dispatch(
            getDocument(id, {
              headers: { Authorization: `Bearer ${bearerToken}` },
            })
          );
        } catch (error) {
          console.log(error);
        }
      };
  
    useEffect(() => {
      if (fetch) {
        fetchDocuments();
        setFetch(false);
      }
    }, [fetch]);

    const handleUpdateDocument = () => {
      try {
        if (currentDocument.documentType===""){
          return;
        }
  
        // TODo: implement update bank
        dispatch(
          updateDocument(
            {
              headers: { Authorization: `Bearer ${bearerToken}` },
            },
            currentDocument
          )
        ).then(()=>{
          setIsEditing(false);
          setFetch(true);
          toast.success("Document updated");
        })
    
        setIsEditing(false);
        setCurrentDocument({
          documentId: "",
          documentType: "",
          file: null,
          fileName: ""
        });
      } catch (error) {
        
      }
    };
    

  // Handle editing a document
  const handleEditDocument = (document: any) => {
    setCurrentDocument({
      documentId: document?.id,
      fileName: document?.fileName,
      documentType: document?.documentType,
      file: document?.file,
      UserId: document?.UserId
    });
    setIsEditing(true);
  };

  // Handle removing a document
  const handleRemoveDocument = (documentId: string) => {
    const confirmRemove = window.confirm(
      "Are you sure you want to remove this document?"
    );
    if (confirmRemove) {
      dispatch(
        deleteDocument(
          documentId,
          {
            headers: { Authorization: `Bearer ${bearerToken}` },
          },
          )
      ).then(()=>{
        setIsEditing(false);
        setFetch(true);
        toast.success("Document removed");
      }
      )
    }
  };

  // Close dialog
  const handleCloseDialog = () => {
    setIsEditing(false);
    setCurrentDocument({
      documentType: "",
      file: null,
      fileName: "",
    });
  };

  return (
    <div>
      <p className="text-2xl font-bold mb-6">Document Upload</p>

      {/* No Documents Added */}
      {rows.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-10 mt-20">
          <div className="h-34 w-34 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500 text-5xl">📄</span>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-xl font-semibold">No Documents</p>
          </div>
        </div>
      )}
    </div>
  );
}