import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgentsService } from './agents.service';

@Component({
  selector: 'app-agents',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.css']
})
export class AgentsComponent implements OnInit {

  agents: any[] = [];

  showAddForm = false;
  isEditMode = false;

  newAgent: any = {
    id: null,
    fullName: '',
    email: '',
    password: '',
    phone: ''
  };

  constructor(private agentsService: AgentsService) {}

  ngOnInit(): void {
    this.loadAgents();
  }

  loadAgents() {
    this.agentsService.getAgents().subscribe({
      next: (data: any[]) => {
        this.agents = data.map(a => ({
          id: a.id,
          fullName: a.fullName,
          email: a.email,
          phone: a.phone
        }));
      },
      error: err => console.error('Error loading agents', err)
    });
  }

  toggleForm() {
    this.showAddForm = !this.showAddForm;
    if (!this.showAddForm) this.resetForm();
  }

  resetForm() {
    this.isEditMode = false;
    this.newAgent = {
      id: null,
      fullName: '',
      email: '',
      password: '',
      phone: ''
    };
  }

  addAgent() {
  const payload = {
    fullName: this.newAgent.fullName,
    email: this.newAgent.email,
    password: this.newAgent.password,
    phone: this.newAgent.phone
  };

  this.agentsService.addAgent(payload).subscribe({
    next: () => {
      alert('Agent added successfully');
      this.loadAgents();
      this.resetForm();
      this.showAddForm = false;
    },
    error: err => {
      alert(err.error || 'Error adding agent');
    }
  });
}


  editAgent(agent: any) {
    this.showAddForm = true;
    this.isEditMode = true;
    this.newAgent = { ...agent, password: '' };
  }

  updateAgent() {
    this.agentsService.updateAgent(this.newAgent.id, this.newAgent).subscribe({
      next: () => {
        alert('Agent updated');
        this.loadAgents();
        this.toggleForm();
      },
      error: err => alert(err.error || 'Update failed')
    });
  }

  deleteAgent(id: number) {
    if (!confirm('Delete this agent?')) return;

    this.agentsService.deleteAgent(id).subscribe({
      next: () => {
        alert('Agent deleted');
        this.loadAgents();
      },
      error: err => alert(err.error || 'Delete failed')
    });

    
  }
}
