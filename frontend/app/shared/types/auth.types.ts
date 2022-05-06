import { NextPage } from 'next';

export type TRoles = {
	isAdminOnly?: boolean;
	isUserOnly?: boolean;
};

export type NextPageAuth<P = {}> = NextPage<P> & TRoles;
export type TypeComponentAuthFields = { Component: TRoles };
