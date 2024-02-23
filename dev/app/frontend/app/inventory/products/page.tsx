'use client'

import React, { useState, useEffect } from 'react';
import productsData from './sample/dummy_products.json';
import Link from "next/link";

type ProductsData = {
    id: number;
    name: string;
    price: number;
    description: string;
}

type InputData = {
    id: string
    name: string;
    price: string;
    description: string;
}

export default function Page() {
    // 読み込みデータを保持
    const [data, setData] = useState<Array<ProductsData>>([]);
    

    useEffect(() => {
        setData(productsData);
    }, [])

    
    // 登録データを保持
    const [input, setInput] = useState<InputData>({
        id: "",
        name: "",
        price: "",
        description: "",
    });
    // 登録データの値を更新
    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;
        setInput({ ...input, [name]: value});
    };

    // 新規登録処理、新規登録行の表示状態を保持
    const [shownNewRow, setShownNewRow] = useState(false);
    const handleShowNewRow = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        setShownNewRow(true);
    };
    const handleAddCancel = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        setShownNewRow(false);
    };
    const handleAdd = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        // バックエンドを使用した登録処理を呼ぶ
        setShownNewRow(false);
    };

    // 更新・削除処理、更新・削除行の表示状態を保持
    const [editingRow, setEditingRow] = useState(0);
    const handleEditRow: any = (id: number) => {
        setShownNewRow(false);
        setEditingRow(id);
        const selectedProduct: ProductsData = data.find((v) => v.id === id) as ProductsData;
        setInput({
            id: id.toString(),
            name: selectedProduct.name,
            price: selectedProduct.price.toString(),
            description: selectedProduct.description,
        });
    };
    const handleEditCancel: any = (id: number) => {
        setEditingRow(0);
    };
    const handleEdit: any = (id: number) => {
        setEditingRow(0);
    };
    const handleDelete: any = (id: number) => setEditingRow(0);

    return (
        <>
            <h2>商品一覧</h2>
            <button onClick={handleShowNewRow}>商品を追加する</button>
            <table>
                <thead>
                    <tr>
                        <th>商品ID</th>
                        <th>商品名</th>
                        <th>単価</th>
                        <th>説明</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {shownNewRow ? (
                        <tr>
                            <td></td>
                            <td><input type="text" name="name" onChange={handleInput} /></td>
                            <td><input type="number" name="price" onChange={handleInput} /></td>
                            <td><input type="text" name="description" onChange={handleInput} /></td>
                            <td></td>
                            <td>
                                <button onClick={handleAddCancel}>キャンセル</button>
                                <button onClick={handleAdd}>登録する</button>
                            </td>
                        </tr>
                    ) : ""}
                    {data.map((data:any) => (
                        editingRow === data.id ? (
                            <tr key={data.id}>
                            <td>{data.id}</td>
                            <td><input type="text" value={input.name} name="name" onChange={handleInput} /></td>
                            <td><input type="number" value={input.price} name="price" onChange={handleInput} /></td>
                            <td><input type="text" value={input.description} name="description" onChange={handleInput} /></td>
                            <td></td>
                            <td>
                                <button onClick={() => handleEditCancel(data.id)}>キャンセル</button>
                                <button onClick={() => handleEdit(data.id)}>更新する</button>
                                <button onClick={() => handleDelete(data.id)}>削除する</button>
                            </td>
                        </tr>
                        ) : (
                            <tr key={data.id}>
                            <td>{data.id}</td>
                            <td>{data.name}</td>
                            <td>{data.price}</td>
                            <td>{data.description}</td>
                            <td><Link href={'/inventory/products/${data.id}'}>在庫処理</Link></td>
                            <td>
                                <button onClick={() => handleEditRow(data.id)}>更新・削除</button>
                            </td>
                        </tr>
                        )
                        
                    ))}
                </tbody>
            </table>
        </>
    )
}