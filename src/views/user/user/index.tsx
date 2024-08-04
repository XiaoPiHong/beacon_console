import { useRef } from "react";
import { XphTable, TXphTableProps, TXphTableActionType } from "xph-crud";
import * as apisUser from "@/apis/user/user";

const User = () => {
	const props: TXphTableProps = {
		table: {
			rowSelection: {
				type: "checkbox"
			},
			fullHeight: true,
			columns: [
				{
					title: "姓名",
					dataIndex: "name",
					key: "name"
				},
				{
					title: "账号",
					dataIndex: "username"
				},
				{
					title: "状态",
					dataIndex: "enabled"
				},
				{
					title: "手机",
					dataIndex: "mobile"
				},
				{
					title: "性别",
					dataIndex: "sex"
				},
				{
					title: "操作",
					dataIndex: "actions",
					cellFunc: ({ record }) => [
						{
							component: "actions",
							componentProps: {
								type: "link",
								max: 1,
								items: [
									{
										key: "add",
										component: "Button",
										componentProps: {
											children: "编辑",
											onClick: e => {
												xphTableRef.current?.open();
											}
										}
									}
								]
							}
						}
					]
				}
			],
			api: apisUser.getUserPage,
			toolbar: {
				type: "primary",
				max: 2,
				items: [
					{
						key: "add",
						component: "Button",
						componentProps: {
							children: "新增",
							onClick: e => {
								xphTableRef.current?.open();
							}
						}
					}
				]
			}
		},
		searchForm: {
			colProps: { span: 3, offset: 1 },
			items: [
				{
					name: "username",
					label: "账号",
					component: "Input"
				},
				{
					name: "name",
					label: "姓名",
					component: "Input"
				},
				{
					name: "mobile",
					label: "手机",
					component: "Input"
				},
				{
					name: "email",
					label: "邮箱",
					component: "Input"
				},
				{
					name: "sex",
					label: "性别",
					component: "RadioGroup",
					componentProps: {
						options: [
							{
								label: "男",
								value: "MALE"
							},
							{
								label: "女",
								value: "FEMALE"
							}
						]
					}
				},
				{
					name: "enabled",
					label: "状态",
					component: "RadioGroup",
					componentProps: {
						options: [
							{
								label: "启用",
								value: true
							},
							{
								label: "禁用",
								value: false
							}
						]
					}
				}
			]
		},
		crudFormDialog: {
			title: "弹窗",
			mask: true,
			formProps: {
				items: [
					{
						name: "username",
						label: "账号",
						required: true,
						component: "Input",
						colProps: { span: 12 }
					},
					{
						name: "name",
						label: "姓名",
						required: true,
						component: "Input",
						colProps: { span: 12 }
					},
					{
						name: "mobile",
						label: "手机",
						required: true,
						component: "Input",
						colProps: { span: 12 }
					},
					{
						name: "email",
						label: "邮箱",
						required: true,
						component: "Input",
						colProps: { span: 12 }
					},
					{
						name: "sex",
						label: "性别",
						required: true,
						component: "RadioGroup",
						componentProps: {
							options: [
								{
									label: "男",
									value: "MALE"
								},
								{
									label: "女",
									value: "FEMALE"
								}
							]
						},
						colProps: { span: 12 }
					},
					{
						name: "enabled",
						label: "状态",
						required: true,
						component: "RadioGroup",
						componentProps: {
							options: [
								{
									label: "启用",
									value: true
								},
								{
									label: "禁用",
									value: false
								}
							]
						},
						colProps: { span: 12 }
					}
				]
			},
			onOk: () => {
				console.log("onOk");
				xphTableRef.current?.validator();
			},
			onCancel: () => {
				console.log("onCancel");
				xphTableRef.current?.close();
			}
		}
	};

	const xphTableRef = useRef<TXphTableActionType>(null);

	return (
		<section style={{ padding: "8px", height: "100%" }}>
			<XphTable
				ref={xphTableRef}
				{...props}
				onRowSelectionChange={(selectRowKeys, selectedRows) => {
					console.log(selectRowKeys, selectedRows);
				}}
			/>
		</section>
	);
};
export default User;
