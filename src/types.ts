/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Teacher {
  id: string;
  name: string;
  roleEn: string;
  roleCz: string;
  bioEn: string;
  bioCz: string;
  featured?: boolean;
}

export interface ClassInfo {
  id: string;
  nameEn: string;
  nameCz: string;
  age: string;
  descriptionEn: string;
  descriptionCz: string;
  color: string;
}

export interface TermFee {
  id: string;
  nameEn: string;
  nameCz: string;
  sessions: number;
  priceChild: number;
  priceSibling: number;
}
