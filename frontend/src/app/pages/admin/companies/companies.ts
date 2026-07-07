import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  AdminCompany,
  AdminCompanyService
} from '../../../services/admin-company.service';

@Component({
  selector: 'app-companies',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './companies.html',
  styleUrl: './companies.css',
})
export class Companies implements OnInit {

  companies: AdminCompany[] = [];

  search = '';

  selectedStatus = 'ALL';

  selectedCompany: AdminCompany | null = null;

  showModal = false;

  constructor(
    private adminCompanyService: AdminCompanyService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.loadCompanies();

  }

  loadCompanies(): void {

    this.adminCompanyService.getAllCompanies().subscribe({

      next: (response) => {

        this.companies = [...response];

        this.cdr.detectChanges();

      },

      error: error => {

        console.error(error);

      }

    });

  }

  get filteredCompanies(): AdminCompany[] {

    return this.companies.filter(company => {

      const companyName =
        (company.companyName ?? '').toLowerCase();

      const matchesSearch =

        companyName.includes(this.search.toLowerCase()) ||

        company.email.toLowerCase().includes(this.search.toLowerCase());

      const matchesStatus =

        this.selectedStatus === 'ALL' ||

        (this.selectedStatus === 'ACTIVE' && company.enabled) ||

        (this.selectedStatus === 'BLOCKED' && !company.enabled);

      return matchesSearch && matchesStatus;

    });

  }

  view(company: AdminCompany): void {

    this.selectedCompany = company;

    this.showModal = true;

  }

  closeModal(): void {

    this.showModal = false;

    this.selectedCompany = null;

  }

  block(company: AdminCompany): void {

    this.adminCompanyService.blockCompany(company.id).subscribe({

      next: () => this.loadCompanies(),

      error: err => console.error(err)

    });

  }

  unblock(company: AdminCompany): void {

    this.adminCompanyService.unblockCompany(company.id).subscribe({

      next: () => this.loadCompanies(),

      error: err => console.error(err)

    });

  }

  delete(company: AdminCompany): void {

    if (!confirm('Delete this company?')) {

      return;

    }

    this.adminCompanyService.deleteCompany(company.id).subscribe({

      next: () => this.loadCompanies(),

      error: err => console.error(err)

    });

  }

}