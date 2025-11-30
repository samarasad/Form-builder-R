// import { useEffect, useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";

// export function DynamicTable() {
//   const [data, setData] = useState([]);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);

//   // Only the columns you want
//   const columns = ["submissionId", "createdAt", "formData"];

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const res = await fetch(
//           `http://localhost:3000/api/get-submissions/get/submissions?page=${page}&sortBy=createdAt&sortOrder=desc`
//         );
//         const json = await res.json();
//         const items = json?.submissions || json?.data || [];
//         setData(items);
//       } catch (err) {
//         console.error("Fetch Error:", err);
//       }
//       setLoading(false);
//     };

//     fetchData();
//   }, [page]);

//   return (
//     <div className="border rounded-lg p-4 shadow-sm bg-black">
//       <Table className="min-w-full">
//         {/* <TableCaption className="text-lg font-bold text-white">
//           SUBMISSIONS FORM
//         </TableCaption> */}

//         <TableHeader>
//           <TableRow className="bg-black">
//             {columns.map((col) => (
//               <TableHead
//                 key={col}
//                 className="text-left text-white font-medium border-b border-gray-700"
//               >
//                 {col}
//               </TableHead>
//             ))}
//           </TableRow>
//         </TableHeader>

//         <TableBody>
//           {loading ? (
//             <TableRow>
//               <TableCell colSpan={columns.length} className="text-center py-6 text-white">
//                 Loading...
//               </TableCell>
//             </TableRow>
//           ) : data.length === 0 ? (
//             <TableRow>
//               <TableCell colSpan={columns.length} className="text-center py-6 text-white">
//                 No data found
//               </TableCell>
//             </TableRow>
//           ) : (
//             data.map((row, i) => (
//               <TableRow
//                 key={i}
//                 className="bg-black hover:bg-gray-900 transition-colors duration-200"
//               >
//                 <TableCell className="text-white py-2">{row.submissionId}</TableCell>
//                 <TableCell className="text-white py-2">{row.createdAt}</TableCell>
//                 <TableCell className="text-white py-2">
//                   {typeof row.formData === "object" ? JSON.stringify(row.formData) : row.formData}
//                 </TableCell>
//               </TableRow>
//             ))
//           )}
//         </TableBody>
//       </Table>

//       {/* Pagination */}
//       <div className="flex justify-between items-center mt-4">
//         <Button
//           variant="outline"
//           onClick={() => setPage((p) => Math.max(1, p - 1))}
//           disabled={page === 1}
//           className="text-white border-gray-700 hover:bg-gray-800"
//         >
//           Previous
//         </Button>
//         <span className="font-medium text-white">Page {page}</span>
//         <Button
//           variant="outline"
//           onClick={() => setPage((p) => p + 1)}
//           className="text-white border-gray-700 hover:bg-gray-800"
//         >
//           Next
//         </Button>
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

// Simple Modal Component
// Modal Component with dark design
function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-black p-6 rounded-lg max-w-lg w-full shadow-lg relative border border-gray-700">
        <button
          className="absolute top-2 right-2 text-white font-bold text-lg"
          onClick={onClose}
        >
          X
        </button>
        <h2 className="text-xl font-bold mb-4 text-white">Form Data</h2>
        <pre className="text-sm bg-gray-900 text-white p-4 rounded overflow-x-auto">
          {JSON.stringify(children, null, 2)}
        </pre>
      </div>
    </div>
  );
}


export function DynamicTable() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState(null); // store selected formData
  const columns = ["submissionId", "createdAt", "formData"];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:3000/api/get-submissions/get/submissions?page=${page}&sortBy=createdAt&sortOrder=desc`
        );
        const json = await res.json();
        const items = json?.submissions || json?.data || [];
        setData(items);
      } catch (err) {
        console.error("Fetch Error:", err);
      }
      setLoading(false);
    };

    fetchData();
  }, [page]);

  return (
    <div className="border rounded-lg p-4 shadow-sm bg-black">
      <Table className="min-w-full">
        <TableCaption className="text-lg font-bold text-white">
          SUBMISSIONS FORM
        </TableCaption>

        <TableHeader>
          <TableRow className="bg-black">
            {columns.map((col) => (
              <TableHead
                key={col}
                className="text-left text-white font-medium border-b border-gray-700"
              >
                {col}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center py-6 text-white">
                Loading...
              </TableCell>
            </TableRow>
          ) : data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center py-6 text-white">
                No data found
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, i) => (
              <TableRow
                key={i}
                className="bg-black hover:bg-gray-900 transition-colors duration-200"
              >
                <TableCell className="text-white py-2">{row.submissionId}</TableCell>
                <TableCell className="text-white py-2">{row.createdAt}</TableCell>
                <TableCell className="text-white py-2">
                  {row.formData && typeof row.formData === "object" ? (
                    <Button
                      variant="outline"
                      className="text-white border-gray-700 hover:bg-gray-800"
                      onClick={() => setModalData(row.formData)}
                    >
                      View Object
                    </Button>
                  ) : (
                    row.formData
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <Button
          variant="outline"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="text-white border-gray-700 hover:bg-gray-800"
        >
          Previous
        </Button>
        <span className="font-medium text-white">Page {page}</span>
        <Button
          variant="outline"
          onClick={() => setPage((p) => p + 1)}
          className="text-white border-gray-700 hover:bg-gray-800"
        >
          Next
        </Button>
      </div>

      {/* Modal */}
      <Modal isOpen={!!modalData} onClose={() => setModalData(null)}>
  {modalData}
</Modal>
    </div>
  );
}
