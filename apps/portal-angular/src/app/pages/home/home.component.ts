import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { AboutComponent } from '../../components/about/about.component';
import { SkillsComponent } from '../../components/skills/skills.component';
import { ExperienceComponent } from '../../components/experience/experience.component';
import { ProjectsComponent } from '../../components/projects/projects.component';
import { CertificationsComponent } from '../../components/certifications/certifications.component';
import { ResumeComponent } from '../../components/resume/resume.component';
import { ContactComponent } from '../../components/contact/contact.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { JdOptimizerComponent } from '../../components/jd-optimizer/jd-optimizer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ExperienceComponent,
    ProjectsComponent,
    CertificationsComponent,
    ResumeComponent,
    ContactComponent,
    FooterComponent,
    JdOptimizerComponent,
  ],
  template: `
    <app-navbar />
    <main>
      <app-hero />
      <app-about />
      <app-skills />
      <app-experience />
      <app-projects />
      <app-certifications />
      <app-resume />
      <app-contact />
    </main>
    <app-footer />
    <app-jd-optimizer />
  `,
  styles: [],
})
export class HomeComponent {}
