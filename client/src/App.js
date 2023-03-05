import React from 'react';
import { Routes, Route } from 'react-router-dom';
import * as Component from './Components';
import ClientRoutes from './Routes/ClientRoutes';
import './App.css';

function App() {
    return (
        <>
            <Routes>
                <Route element={<ClientRoutes />}>
                    <Route path="/" element={<Component.PageLogin />}></Route>
                </Route>
                <Route path="/admin" element={<Component.PageAdmin />}>
                    <Route index element={<Component.TransactionManagerAdmin />} />
                    <Route path="export-manager" element={<Component.ExportManagerAdmin />} />
                    <Route path="form-export" element={<Component.FormExportAdmin />} />
                    <Route path="form-export-detail/:id" element={<Component.FormExportDetailAdmin />} />
                    <Route path="import-manager" element={<Component.ImportManagerAdmin />} />
                    <Route path="form-import" element={<Component.FormImportAdmin />} />
                    <Route path="form-import-detail/:id" element={<Component.FormImportDetailAdmin />} />
                    
                    <Route path="transaction-manager" element={<Component.TransactionManagerAdmin />} />
                    <Route path="product-manager" element={<Component.ProductManagerAdmin />} />
                    <Route path="add-type" element={<Component.AddTypeProductAdmin />} />
                    <Route path="edit-type/:id" element={<Component.EditTypeProductAdmin />} />
                    <Route path="type-product-manager" element={<Component.TypeProductManagerAdmin />} />
                    <Route path="supplier-manager" element={<Component.SupplierManagerAdmin />} />
                    <Route path="staff-manager" element={<Component.StaffManagerAdmin />} />
                    <Route path="create-staff" element={<Component.AddStaff />} />
                    <Route path="brand-manager" element={<Component.BrandManagerAdmin />} />
                    <Route path="add-brand" element={<Component.AddBrand />} />
                    <Route path="edit-brand/:id" element={<Component.EditBrand />} />
                    <Route path="kho-manager" element={<Component.KhoManagerAdmin />} />
                    <Route path="add-kho" element={<Component.AddKho />} />
                    <Route path="edit-kho/:id" element={<Component.EditKho />} />

                </Route>
                <Route path="/staff" element={<Component.PageStaff />}>
                    <Route index element={<Component.ImportManagerStaff />} />
                    <Route path="export-manager" element={<Component.ExportManagerStaff />} />
                    <Route path="import-manager" element={<Component.ImportManagerStaff />} />
                    <Route path="form-import-detail/:id" element={<Component.FormImportDetailStaff />} />
                    <Route path="import-form" element={<Component.ImportFormStaff />} />
                    <Route path="transaction-manager" element={<Component.TransactionManagerStaff />} />
                    <Route path="product-manager" element={<Component.ProductManagerStaff />} />
                    <Route path="type-product-manager" element={<Component.TypeProductManagerStaff />} />
                    <Route path="brand-manager" element={<Component.BrandManager />} />
                    <Route path="kho-manager" element={<Component.KhoManager />} />

                </Route>
                <Route path="/qlkho" element={<Component.PageQLKho />}>
                    <Route index element={<Component.ProductManagerKho />} />
                    <Route path="import-manager" element={<Component.ImportManagerKho />} />
                    <Route path="form-import-detail/:id" element={<Component.FormImportDetailSKho />} />
                    <Route path="import-form" element={<Component.ImportFormKho />} />
                    <Route path="product-manager" element={<Component.ProductManagerKho />} />
                    <Route path="brand-manager" element={<Component.BrandManager />} />
                    <Route path="kho-manager" element={<Component.KhoManager />} />
                    <Route path="type-product-manager" element={<Component.TypeProductManager />} />
                    <Route path="export-manager" element={<Component.ExportManagerKho />} />
                    <Route path="export-form" element={<Component.ExportFormKho />} />
                    <Route path="form-export-detail/:id" element={<Component.FormExportDetailSKho />} />
                    {/* 
                    
                    
                    
                    <Route path="transaction-manager" element={<Component.TransactionManagerStaff />} />
                    
                    <Route path="type-product-manager" element={<Component.TypeProductManagerStaff />} /> */}

                </Route>
            </Routes>
        </>
    );
}

export default App;
